import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./Home.css";
import { toast } from "react-toastify";
import axios from "axios";
import jsPDF from "jspdf";

function Home() {
    const [data, setData] = useState([]);

    const loadData = async () => {
        const response = await axios.get("http://localhost:5000/api/get");
        setData(response.data);
    };

    useEffect(() => {
        loadData();
    }, []);

    const deleteContact = (id) => {
        if (window.confirm("Are you sure you want to delete this entry?")) {
            axios
                .delete(`http://localhost:5000/api/remove/${id}`)
                .then(() => {
                    toast.success("Contact deleted successfully");
                    setTimeout(() => loadData(), 500);
                })
                .catch((error) => {
                    toast.error(error.response.data);
                });
        }
    };
// {name, phone, school, class_, roll_no, address
    const downloadPDF = (item) => {
        const pdf = new jsPDF();
        pdf.text(`Name:${item.name}`, 10, 10);
        pdf.text(`Email: ${item.phone}`, 10, 20);
        pdf.text(`School: ${item.school}`, 10, 30);
        pdf.text(`Class: ${item.myclass}`, 10, 40);
        pdf.text(`Roll No: ${item.rollNo}`, 10, 50);
        pdf.text(`Address: ${item.address}`, 10, 60);
        pdf.save(`${item.name}.pdf`);
    };

    return (
        <div style={{ marginTop: "150px" }}>
            <Link to="/addContact">
                <button className="btn btn-contact">Add Entry</button>
            </Link>
            <table className="styled-table table">
                <thead>
                    <tr>
                        <th style={{ textAlign: "center" }}>No.</th>
                        <th style={{ textAlign: "center" }}>Name</th>
                        <th style={{ textAlign: "center" }}>phone</th>
                        <th style={{ textAlign: "center" }}>school</th>
                        <th style={{ textAlign: "center" }}>class</th>
                        <th style={{ textAlign: "center" }}>Roll no</th>
                        <th style={{ textAlign: "center" }}>Adress</th>
                        <th style={{ textAlign: "center" }}>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((item, index) => {
                        return (
                            <tr key={item.id}>
                                <th scope="row">{index + 1}</th>
                                <td>{item.name}</td>
                                <td>{item.phone}</td>
                                <td>{item.school}</td>
                                <td>{item.myclass}</td>
                                <td>{item.rollNo}</td>
                                <td>{item.address}</td>
                                

                                <td>
                                   
                                    <button
                                        className="btn btn-delete"
                                        onClick={() => deleteContact(item.id)}
                                    >
                                        Delete
                                    </button>

                                    <button
                                        className="btn btn-view"
                                        onClick={() => downloadPDF(item)}
                                    >
                                        Download
                                    </button>
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
}

export default Home;
