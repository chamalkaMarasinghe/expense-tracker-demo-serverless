import React, { useEffect, useState } from "react";
import { getDocs, collection } from "firebase/firestore";
import { db } from "../../firebase";

const Expenses = () => {

    const [expenseList, setExpenseList] = useState([]);
    const [dataFetching, setDataFetching] = useState(true);

    const loadData = async() => {
        const querySnapshot = await getDocs(collection(db, "expenses"));
        const data = [];
        querySnapshot.forEach((doc) => {
            // doc.data() is never undefined for query doc snapshots
            data.push(doc.data());
        });
        return data;
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
                        expenseList.map((expense, index) => {
                            return(
                                <div className="expense-item" key={index}>
                                    <div className="col-1">
                                        <img src={expense.img}/>
                                    </div>
                                    <div className="col-2">
                                        <div className="title">{expense.title}</div>
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