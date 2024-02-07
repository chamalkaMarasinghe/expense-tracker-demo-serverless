import React, { useEffect, useState } from "react";
import { getDocs, setDoc, deleteDoc, doc, collection, serverTimestamp, or } from "firebase/firestore";
import { ref, deleteObject, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { db, storage } from "../../firebase";
import SampleImg from '../../assets/images/upload-img.png';
import LoadingScreen from "../../components/loadingScreen";

const Expenses = () => {

    const [screenWidth, setScreenWidth] = useState(window.innerWidth);
    const [expenseList, setExpenseList] = useState([]);
    const [dataFetching, setDataFetching] = useState(true);
    const [loading, setLoading] = useState(false);
    const [file, setFile] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);
    const [clickedExpense, setClickedExpense] = useState(null);
    const [expenseData, setExpenseData] = useState({
        id: '',
        title: '',
        date: '',
        description: '',
        img: '',
        imgFileName: ''
    });

    //fetch all the data from a collection
    const loadData = async() => {
        const querySnapshot = await getDocs(collection(db, "expenses"));
        const data = [];
        querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            data.push({...doc.data(), id : doc.id});
        });
        return data;
    }

    //delete a item
    const deleteItem = async(expense) => {
        await deleteDoc(doc(db, "expenses", expense.id));
        
        // Create a reference to the file to delete(image of the document in firebase storage)
        const desertRef = ref(storage, expense.img);

        // Delete the file(image)
        deleteObject(desertRef).then(() => {
            // File deleted successfully
        }).catch((error) => {
            window.alert("Document is deleted; But it's image is still here!");
        });
    }

    //load the clicked item's data into the updateable form
    const setUpdateableData = (expense) => {
        setExpenseData({
            id: expense.id,
            title: expense.title,
            date: expense.expenseDate,
            description: expense.description,
            img: expense.img,
            imgFileName: expense.imgFileName
        });
    }

    //update a item
    const handleSubmit = async(e) => {
        e.preventDefault();
        if(!expenseData.id || !(expenseData.title !== clickedExpense.title || expenseData.date !== clickedExpense.expenseDate || expenseData.description !== clickedExpense.description || file !== null)){
            window.alert('Please select a document to update or nothing to update!')
        }else{
            setLoading(true);

            //if the user does not changed the current image
            if(file === null){
                // Add a new document in collection "cities"
                await setDoc(doc(db, "expenses", expenseData.id), {
                    title: expenseData.title,
                    description: expenseData.description,
                    expenseDate: expenseData.date,
                    img: expenseData.img,
                    imgFileName: expenseData.imgFileName,
                    currentDate: serverTimestamp(),
                });
                setLoading(false);
                window.alert(`Document Updated`);
            }
            else{//if the user has changed the current image
                //we use the same file name; hence override the image
                const storageRef = ref(storage, expenseData.imgFileName);
                const uploadTask = uploadBytesResumable(storageRef, file);

                uploadTask.on('state_changed',
                    (snapshot) => {
                        switch (snapshot.state) {
                            case 'paused':
                                setLoading(false);
                                window.alert('Upload is paused');
                                break;
                        }
                    }, 
                    (error) => {
                        switch (error.code) {
                            case 'storage/unauthorized':
                                setLoading(false);
                                break;
                            case 'storage/canceled':
                                setLoading(false);
                                break;
                            case 'storage/unknown':
                                setLoading(false);
                                break;
                            default:
                                break;
                        }
                    }, 
                    async() => {
                        // Upload completed successfully, now we can get the download URL
                        // if the img is uploaded successfully, other data is get saved in the db
                        //set the previous downloadurl - but the img content is got overriden by new img
                        await setDoc(doc(db, "expenses", expenseData.id), {
                            title: expenseData.title,
                            description: expenseData.description,
                            expenseDate: expenseData.date,
                            img: expenseData.img,
                            imgFileName: expenseData.imgFileName,
                            currentDate: serverTimestamp(),
                        });
                        setLoading(false);
                        window.alert(`Document Updated`);
                    }
                );
            }

            //reset form data and img upload data
            setFile(null);
            setExpenseData({
                id: '',
                title: '',
                date: '',
                description: '',
                img: '',
                imgFileName: ''
            });
            setClickedExpense(null);
        }
    }

    const openDrawer = () => {
        const updateWrapper = document.getElementsByClassName("expenses-update-wrapper")[0];
        updateWrapper.style.display='block';
        updateWrapper.style.transition='margin-left 0.2s';
        updateWrapper.style.marginLeft='20%';

        document.getElementsByClassName("expenses-page-wrapper")[0].style.paddingTop='0px';
        document.getElementsByClassName("expenses-update-wrapper")[0].style.paddingBottom='0px';
    }

    const closeDrawer = () => {
        const updateWrapper = document.getElementsByClassName("expenses-update-wrapper")[0];
        updateWrapper.style.marginLeft='100%';
        updateWrapper.style.display='none';

        document.getElementsByClassName("expenses-page-wrapper")[0].style.paddingTop='1%';
        document.getElementsByClassName("expenses-update-wrapper")[0].style.paddingBottom='1%';
    }

    // reset left margin of expense card items after delete single expense card
    const resetStyling = () => {
        const items = document.getElementsByClassName("expense-item");
        for (var i = 0; i < items.length; ++i) {
            items[i].style.marginLeft = '2.5%';
        }
    }

    // define a listner to detect the screen width
    useEffect(() => {
        const handleResize = () => {
            setScreenWidth(window.innerWidth);
            if(window.innerWidth > 480){
                const x = document.getElementsByClassName('expenses-update-wrapper')[0];
            }
        };
        window.addEventListener('resize', handleResize);
        
        // Cleanup
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    // handle the styling during the data fetching time(show loading gif during fetching data)
    useEffect(() => {
        if(dataFetching){
            const items = document.getElementsByClassName("expense-item");
            for (var i = 0; i < items.length; ++i) {
                items[i].style.display='none';
            }
        }else{
            document.getElementsByClassName('expenses-list')[0].style.backgroundImage='none';
            const items = document.getElementsByClassName("expense-item");
            for (var i = 0; i < items.length; ++i) {
                items[i].style.display='flex';
            }
        }
    }, [dataFetching]);

    // loading data 
    useEffect(() => {
        loadData().then((data) => {setExpenseList(data); setDataFetching(false)});
    }, [])

    return(
        <div className="expenses-page-wrapper">
            {
                loading && <LoadingScreen />
            }
            <div className="expenses-list-wrapper">
                <div className="expenses-header">
                    <p>Expenses</p>
                    <hr />
                </div>
                <div className="expenses-list">
                    {
                        resetStyling()
                    }
                    {
                        expenseList.map((expense, index) => {
                            return(
                                <div className="expense-item" key={index} id={index}>
                                    <div className="col-1">
                                        <img src={expense.img}/>
                                    </div>
                                    <div className="col-2">
                                        <div className="title">
                                            {expense.title}
                                            <div className="cancel-icon">
                                                <i className="fa-regular fa-pen-to-square" 
                                                    onClick={() => {
                                                        if(screenWidth <= 480)
                                                            openDrawer();
                                                        setUpdateableData(expense);
                                                        setClickedExpense(expense);
                                                    }}
                                                >
                                                </i>
                                                <i className="fa-solid fa-xmark"
                                                    onClick={() => {
                                                        document.getElementById(index).style.marginLeft = '100%';
                                                        setTimeout(() => {
                                                            setExpenseList(expenseList.filter(item => {return item.id != expense.id}));
                                                        }, 210);
                                                        deleteItem(expense);
                                                    }}
                                                >
                                                </i>
                                            </div>
                                        </div>
                                        <hr />
                                        <div className="date">{expense.expenseDate}</div>
                                        <div className="description">
                                            <p>
                                                {expense.description}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            );
                        })
                    }
                </div>
            </div>
            <div className="expenses-update-wrapper">
                <div className="expenses-header update-header">
                    <p>
                        {
                            screenWidth > 480 ? 'Update Expense' : <i className="fa-solid fa-angles-right" onClick={() => closeDrawer()}></i>
                        }
                    </p>
                    <hr />
                </div>
                <div className="body">
                    <div className="img-wrapper">
                        <label htmlFor="img-upload" className="img-upload-label">
                            <img 
                                src={expenseData.img != '' && file === null ? expenseData.img : file === null ? SampleImg : imagePreview} 
                                id="expense-updateable-img"
                            />
                            <input 
                                id="img-upload" 
                                className="img-upload" 
                                name="img-upload" 
                                type="file" 
                                accept="image/png, image/jpg, image/gif, image/jpeg"
                                onChange={(e) => {
                                    const img = e.target.files[0];
                                    if (img) {
                                        const reader = new FileReader();
                                        reader.onloadend = () => {
                                            setImagePreview(reader.result);
                                        };
                                        reader.readAsDataURL(img);
                                    }
                                    setFile(img);
                                }}
                            />
                        </label>
                    </div>
                    <form onSubmit={(e) => {handleSubmit(e)}}>
                        <div className="text-edit-container">
                            <input name="title" type="text" placeholder="Title" value={expenseData.title} onChange={(e) => {setExpenseData({...expenseData, title: e.target.value})}} />
                        </div>
                        <div className="text-edit-container">
                            <input name="date" type="text" placeholder="Date" value={expenseData.date} onChange={(e) => {setExpenseData({...expenseData, date: e.target.value})}} />
                        </div>
                        <div className="text-edit-container">
                            <input name="description" type="text" placeholder="Dscription" value={expenseData.description} onChange={(e) => {setExpenseData({...expenseData, description: e.target.value})}} />
                        </div>
                        <div className="text-edit-container submit-btn-container">
                            <input name="submit" type="submit" value='Update' onChange={() => {}} />
                        </div>
                    </form>
                </div>    
            </div>
        </div>
    );
}

export default Expenses;