import React, {Component} from 'react';
import LeftPanelStudents from '../LeftPanelStudents';
import * as firebase from 'firebase';
import Logout from '../logout';
import ContactList from "../Components/ContactList";
import Divider from "@material-ui/core/Divider";

class JobSummary extends Component {
    constructor() {
        super();
        this.state = {
            firebase: ''
        }
    }

    getData() {
        var userId = firebase.auth().currentUser.uid;
        firebase.database().ref('USER').once('value').then(function (snapshot) {
            var username = snapshot.val();
            console.log(snapshot.val());
            console.log('hello student')

        })
    };


    render() {
        const database =
            [
                {
                    jobName: "help with my cat",
                    id: "1",
                    status: "In Progress",
                    post:true,
                    post_date: '2020-03-02',
                    expire_date: '2020-03-07'
                },
                {
                    jobName: "Math homework",
                    id: "2",
                    status: "Complete",
                    post:true,
                    post_date: '2020-02-26',
                    expire_date: '2020-03-02'
                },
                {
                    jobName: "House Moving",
                    id: "3",
                    status: "In Progress",
                    post:false,
                    apply_date: "2020-03-04",
                    expire_date: '2020-03-07'
                },
                {
                    jobName: "Chemistry Midterm review",
                    id: "4",
                    status: "Complete",
                    post:false,
                    apply_date: "2020-02-15",
                    expire_date: '2020-02-29'
                }
            ];

        let data = database[this.props.match.params.id-1];
        return (
            //import jon detail
            <div>
                <div align={'left'}>
                    {data.post ?
                        <h3>&nbsp;&nbsp;My Post Summary</h3>:
                        <h3>&nbsp;&nbsp;My Application Summary</h3>
                    }
                    <ul>
                        <li>Job Name: {data.jobName}</li>
                        <li>Status: {data.status}</li>
                        {data.post?
                            <li>Posted On: {data.post_date}</li>:
                            <li>Applied On: {data.apply_date}</li>
                        }

                        <li>Expire Date: {data.expire_date}</li>
                    </ul>
                </div>
                <Divider/>
                {this.props.match.params.id == 1 ?
                <div>
                    <ContactList/>
                    <Divider/>
                </div>
                : <div/>
            }
                <Divider/>
                <h2>This is where the Job Detail Goes with Job UID: {this.props.match.params.id}</h2>
                <Divider/>
            </div>

        );
    }

}

export default JobSummary;
