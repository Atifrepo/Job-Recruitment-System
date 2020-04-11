import React, {Component} from 'react';
import ContactList from "../Components/ContactList";
import Divider from "@material-ui/core/Divider";
import TaskDetails_detail from "../TaskDetails_detail";
import {auth, database} from "../firebase";
import JobSummaryPost from "./JobSummaryPost";
import JobSummaryPostDelete from "./JobSummaryPostDelete";
import Item from "../Components/ContactList/Item";
import {parseCode} from "../status";
import JobSummaryApplyDelete from "./JobSummaryApplyDelete";
import {convertTime} from "../timeFormat";
import withAuthorization from "../withAuthorization";

class JobSummaryApply extends Component {
    constructor() {
        super();
        this.state = {
            firebase: '',
            task_data: null,
            applicant_data: null,
            loading: true
        }

    }

    componentDidMount() {
        let app_id = this.props.match.params.id
        let ref = database.ref("applicant/" + app_id);

        ref.on("value", (snapshot) => {
            let item = snapshot.val();
            this.setState({
                applicant_data: item
            });
        });


        let task_ref = database.ref("task/" + this.props.match.params.pid);
        let task_data = null;
        task_ref.on("value", (snapshot) => {
            task_data = snapshot.val();
            this.setState({
                task_data: task_data,
                loading: false
            });
        });



    }

    render() {
        const applicant_data = this.state.applicant_data;
        const task_data = this.state.task_data;
        console.log(applicant_data);
        console.log(task_data);
        return (!applicant_data || !task_data) ? (<div>Loading</div>) : (
            //import jon detail
            <div>
                <div align={'left'}>
                    <h3>&nbsp;&nbsp;My Application Summary</h3>
                    <ul>
                        <li>Job Name: {applicant_data.title}</li>
                        <li>Status: {parseCode(applicant_data.status)}</li>
                        <li>Applied On: {convertTime(applicant_data.applyDate)}</li>
                        <li>Expire Date: {convertTime(task_data.startDate)}</li>
                    </ul>
                </div>
                <Divider/>

                {(applicant_data.status === "2.2" || applicant_data.status === "2.4") ?
                    <Item data={task_data} status={applicant_data.status}/> :
                    <div/>
                }
                {(applicant_data.status === "2.2" ) ?
                    <h5>Please contact the poster to confirm the completeness and get your reward!</h5> :
                    <div/>
                }

                <Divider/>
                <TaskDetails_detail id={applicant_data.task_id}/>

                {applicant_data.status==="2.1"?<div style={{'paddingLeft':'20px','text-align':'center'}}>
                        <JobSummaryApplyDelete applicant_data={applicant_data} task_data={task_data} title={"WithDraw"}/>
                    </div>
                    :
                    <div/>}
            </div>

        );
    }

}

const authCondition = authUser => !!authUser;

export default withAuthorization(authCondition)(JobSummaryApply);
