import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { db, storage } from "../../firebase";
import SampleImg from "../../assets/images/upload-img.png";
import LoadingScreen from '../../components/loadingScreen';

const Dashboard = () => {

    const navigate = useNavigate();

    const [file, setFile] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);
    const [loading, setLoading] = useState(false);


    //insert a item
    const insertItem = async() => {
        try {
            if(!file){
                window.alert("Plesae upload the image first!");
            }else{
                setLoading(true);

                const fileName = new Date().getTime() + file.name;
                const storageRef = ref(storage, fileName);
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
                    () => {
                        // Upload completed successfully, now we can get the download URL
                        // if the img is uploaded successfully, other data is get saved in the db
                        getDownloadURL(uploadTask.snapshot.ref).then(async(downloadURL) => {
                            //get the img uploaded url and it save in the database
                            const docRef = await addDoc(collection(db, "expenses"), {
                                title: 'fake title 1',
                                description: 'fake description 1',
                                expenseDate: '2023-02-23',
                                img: downloadURL,
                                imgFileName: fileName,
                                currentDate: serverTimestamp()
                            });
                            setLoading(false);
                            window.alert(`Document written with ID:  ${docRef.id}`);
                        });
                    }
                );
            }
        } catch (e) {
            setLoading(false);
            window.alert(`Error adding document:  ${e}`);
        }
    };

    return(
        <div className="dashboard-page-wrapper">
            {
                loading && <LoadingScreen />
            }
            <div className="dasboard-page-pallete">
                <label htmlFor="img-upload" className="img-upload-label">
                    <img src={file === null ? SampleImg : imagePreview}/>
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
                <button onClick={() => {insertItem()}}>Insert Expense</button>
                <button onClick={() => {navigate('/expense')}}>Display Expense</button>
            </div>
        </div>
    );
};

export default Dashboard