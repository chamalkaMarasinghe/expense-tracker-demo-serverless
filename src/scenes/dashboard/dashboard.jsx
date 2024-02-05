import React from "react";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "../../firebase"

const Dashboard = () => {

    const insertItem = async() => {
        try {
            const docRef = await addDoc(collection(db, "expenses"), {
                title: 'fake title 1',
                description: 'fake description 1',
                expenseDate: '2023-12-23',
                currentDate: serverTimestamp()
            });
            window.alert(`Document written with ID:  ${docRef.id}`);
        } catch (e) {
            window.alert(`Error adding document:  e`);
        }
    };

    return(
        <div className="dashboard-page-wrapper">
            <div className="dasboard-page-pallete">
                <button onClick={() => {insertItem()}}>Insert Expense</button>
            </div>
        </div>
    );
};

export default Dashboard