import React, { useEffect, useState } from "react";
import { getDocs, deleteDoc, doc, collection } from "firebase/firestore";
import { db } from "../../firebase";

const Expenses = () => {

    const [expenseList, setExpenseList] = useState([]);
    const [dataFetching, setDataFetching] = useState(true);

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
    const deleteItem = async(id) => {

        await deleteDoc(doc(db, "expenses", id));
    }

    // handle the styling during the data fetching time
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

    const resetStyling = () => {
        const items = document.getElementsByClassName("expense-item");
        for (var i = 0; i < items.length; ++i) {
            items[i].style.marginLeft = '2.5%';
        }
    }

    useEffect(() => {
        loadData().then((data) => {setExpenseList(data); setDataFetching(false)});
    }, [])

    return(
        <div className="expenses-page-wrapper">
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
                                                <i className="fa-solid fa-xmark"
                                                    onClick={() => {
                                                        document.getElementById(index).style.marginLeft = '100%';
                                                        setTimeout(() => {
                                                            setExpenseList(expenseList.filter(item => {return item.id != expense.id}));
                                                        }, 210);
                                                        deleteItem(expense.id);
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
        </div>
    );
}

export default Expenses;