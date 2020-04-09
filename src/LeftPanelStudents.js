import React, {Component} from 'react';
import './LeftPanelStudents.css';
import {Link, Redirect} from 'react-router-dom';
import JobList from "./Components/JobListPost";
import JobListApply from "./Components/JobListApply";
import Divider from "@material-ui/core/Divider";
import Logout from "./logout";
import {auth, database} from "./firebase";
import PureRenderMixin from "react-addons-pure-render-mixin";
import JobListPost from "./Components/JobListPost";

class LeftPanelStudents extends React.Component {

    constructor(props) {
        super(props);
        this.data = [];
        this.state = {
            user: 'guanzhou',
            postdata: [],
            applydata: [],
            loading: true
        }
        //this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    }

    componentDidMount() {
        let ref = database.ref("user-task/" + auth.currentUser.uid +'/task');
        this.data = ref.on("value", (snapshot) => {
            const datalist = [];
            snapshot.forEach(data => {
                datalist.push(data.val());
            });
            this.setState({
                postdata: datalist
            });
        });

        ref = database.ref("user-applicant/" + auth.currentUser.uid);
        let task_ref = database.ref("task");
        this.data = ref.on("value", (snapshot) => {
            const datalist = [];
            snapshot.forEach(data => {
                let item = data.val();
                task_ref = database.ref("task/" + item.task_id);
                task_ref.on("value", (snapshot) => {
                    item['task'] = snapshot.val();
                })
                datalist.push(item);
            });
            console.log(datalist);

            this.setState({
                loading: false,
                applydata: datalist
            });
        });
    }


    render() {
        console.log(this.state.applydata)
        //const {user,loading, datalist} = this.state;
        return this.state.loading ? (
                <div>
                    loading...
                </div>
            ) :
            (
                <div>
                    <div>

                        {this.state.user ?
                            <div>

                                <div style={{backgroundColor: '#152938', height: 50}}>
                                    <h2 style={{color: '#FFFFFF', paddingLeft: '10px'}}>My Task</h2>

                                </div>
                                <div style={{
                                    margin: 'auto',
                                    height: 'auto',
                                    overflow: 'auto',
                                    backgroundColor: '#1f3b51'
                                }}>
                                    <h3 style={{color: '#FFFFFF', paddingLeft: '30px'}}>My Post</h3>
                                    <Divider/>
                                    {this.state.postdata.length ?
                                        <JobListPost data={this.state.postdata}/> :
                                        <Link style={{'color': '#fb601d'}} to="/postjob">
                                            Post First Task!
                                        </Link>

                                    }

                                </div>
                                <div style={{
                                    margin: 'auto',
                                    height: 'auto',
                                    overflow: 'auto',
                                    backgroundColor: '#4b6273'
                                }}>
                                    <h3 style={{color: '#FFFFFF', paddingLeft: '30px'}}>My Application</h3>
                                    <Divider/>
                                    {this.state.applydata.length ?
                                        <JobListApply data={this.state.applydata}/> :
                                        <Link style={{'color': '#fb601d'}} to="/">
                                            Apply Now!
                                        </Link>

                                    }
                                </div>

                            </div>


                            :
                            //if not log in, redirect to login page.
                            <Redirect to="/"/>
                        }


                    </div>
                    <Logout {...this.props}/>
                </div>
            )
    }
}

export default LeftPanelStudents;