import React from "react";
import Img from '../../assets/images/login-background.jpg'

const Expenses = () => {
    return(
        <div className="expenses-page-wrapper">
            <div className="expenses-list-wrapper">
                <div className="expenses-header">
                    <p>Expenses</p>
                    <hr />
                </div>
                <div className="expenses-list">
                    <div className="expense-item">
                        <div className="col-1">
                            <img src={Img}/>
                        </div>
                        <div className="col-2">
                            <div className="title">Boarding house rental fee Boarding house rental fee Boarding house rental fee</div>
                            <hr />
                            <div className="date">2024-01-05</div>
                            <div className="description">
                                <p>
                                    handover 10 thousand ruppes to the wardner handover 10 thousand ruppes to the wardner handover 10 thousand ruppes to the wardner
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="expense-item">
                        <div className="col-1">
                            <img src={Img}/>
                        </div>
                        <div className="col-2">
                            <div className="title">Boarding house rental fee</div>
                            <hr />
                            <div className="date">2024-01-05</div>
                            <div className="description">
                                <p>
                                    handover 10 thousand ruppes to the wardner
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="expense-item">
                        <div className="col-1">
                            <img src={Img}/>
                        </div>
                        <div className="col-2">
                            <div className="title">Boarding house rental fee</div>
                            <hr />
                            <div className="date">2024-01-05</div>
                            <div className="description">
                                <p>
                                    handover 10 thousand ruppes to the wardner
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="expense-item">
                        <div className="col-1">
                            <img src={Img}/>
                        </div>
                        <div className="col-2">
                            <div className="title">Boarding house rental fee</div>
                            <hr />
                            <div className="date">2024-01-05</div>
                            <div className="description">
                                <p>
                                    handover 10 thousand ruppes to the wardner
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="expense-item">
                        <div className="col-1">
                            <img src={Img}/>
                        </div>
                        <div className="col-2">
                            <div className="title">Boarding house rental fee</div>
                            <hr />
                            <div className="date">2024-01-05</div>
                            <div className="description">
                                <p>
                                    handover 10 thousand ruppes to the wardner
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="expense-item">
                        <div className="col-1">
                            <img src={Img}/>
                        </div>
                        <div className="col-2">
                            <div className="title">Boarding house rental fee</div>
                            <hr />
                            <div className="date">2024-01-05</div>
                            <div className="description">
                                <p>
                                    handover 10 thousand ruppes to the wardner
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Expenses;