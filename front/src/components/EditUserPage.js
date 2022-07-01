import React, { Component } from "react";
import axios from "axios";
import '../style/EditUserPage.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {
  BrowserRouter as Router,
  Redirect
} from "react-router-dom";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPen, faTrash } from '@fortawesome/free-solid-svg-icons';
import BootstrapTable from 'react-bootstrap-table-next';
import ToolkitProvider, { Search } from 'react-bootstrap-table2-toolkit';
import paginationFactory, { PaginationProvider,PaginationListStandalone,
    PaginationTotalStandalone,
    SizePerPageDropdownStandalone } from 'react-bootstrap-table2-paginator';
import 'react-bootstrap-table2-paginator/dist/react-bootstrap-table2-paginator.min.css';
import {Link} from "react-router-dom";
const { SearchBar } = Search;

export default class ManageUsers extends Component {

    constructor(props) {
        super(props);
        this.state = {

            userInfos: null,

            users: [],

            columns:[
                {
                    dataField: 'firstname',
                    text: 'Firstname'
                },
                {
                    dataField: 'lastname',
                    text: 'Lastname'
                },
                {
                    dataField: 'role',
                    text: 'Role',
                },
                {
                    dataField:'actions',
                    text: 'Actions',
                    formatter: this.actionFormatter
                }
              ]
        }
    }

    actionFormatter(cell, row) {

            return (
                <span>
                <a href={ cell.edit} style={{paddingRight:"5px"}}>
                    <FontAwesomeIcon icon={faPen}/>
                </a>

                <a href={ cell.delete }>
                    <FontAwesomeIcon icon={faTrash}/>
                </a>
            </span>);



    }

    componentDidMount() {



        const ApiUrl = 'http://localhost:8000/users';
        
        axios.get(ApiUrl, { headers: {"Authorization" : `${localStorage.getItem('UserToken')}`} })
            .then((res) => {

                let obj = [];
                let dataOb = res.data;
               for (const item in dataOb){


                        obj.push(dataOb[item]);
                }

               console.log(obj);
                //console.log(res.data[localStorage.getItem('UserId')]);
            this.setState({
                users: obj
            })
        });

      //  console.log(this.state.userInfos);


    }

    render() {
        const paginationOption = {
            sizePerPage: 5,
            custom: true,
            totalSize: this.state.users.length
        };
        return( <div className="edit-user-container">
            <ToolkitProvider  keyField="user_id" data={this.state.users} columns={this.state.columns} search>
                {
                    props =>

                        <PaginationProvider
                            pagination={ paginationFactory(paginationOption) }
                        >
                            {
                                ({
                                     paginationProps,
                                     paginationTableProps
                                 }) => (
                                    <div className="container">

                                        <h2>Admin - manage users</h2>
                                        <div className="search-container">
                                          <SearchBar className="edit-user-tab-search" { ...props.searchProps } />
                                        </div>                                    
                                        <BootstrapTable keyField="user_id" headerClasses={"text-center"} rowStyle={{textAlign:"center"}} {...props.baseProps} striped={true} hover={true} { ...paginationTableProps }/>
                                        <SizePerPageDropdownStandalone { ...paginationProps } />
                                        <PaginationTotalStandalone { ...paginationProps }/>
                                        <PaginationListStandalone { ...paginationProps }/>
                                    </div>
                                )
                            }
                        </PaginationProvider>

                }
            </ToolkitProvider>

        </div>);
    }

}
