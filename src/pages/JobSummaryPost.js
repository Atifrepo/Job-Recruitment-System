import React, {Component} from 'react';
import ContactList from "../Components/ContactList";
import Divider from "@material-ui/core/Divider";
import TaskDetails_detail from "../TaskDetails_detail";
import {auth, database} from "../firebase";
import {parseCode} from "../status";
import Item from "../Components/ContactList/Item";
import JobSummaryPostDelete from "./JobSummaryPostDelete";
import {convertTime} from "../timeFormat";
import withAuthorization from "../withAuthorization";

class JobSummaryPost extends Component {
    constructor() {
        super();
        this.state = {
            firebase: '',
            data: null,
            loading: true,
            contact_list: []
        }
    }

    componentDidMount() {
        let ref = database.ref("task/" + this.props.match.params.id );
        ref.on("value", (snapshot) => {
            let item = snapshot.val();
            if (item) {
                this.setState({data: item});
            }
        });

        let applicant_ref = database.ref("task-applicant/" + this.props.match.params.id + "/applicant");
        this.data = applicant_ref.on("value", (snapshot) => {
            const datalist = [];
            snapshot.forEach(data => {
                datalist.push(data.val());
            });
            this.setState({
                contact_list: datalist,
                loading: false
            });
        });


    }

    statusRelatedContent(status){
        switch (status) {
            case "1.1":{
                return (<ContactList data={this.state.contact_list} status={status}/>);
            }
            case "1.2":{
                    if(this.state.contact_list){
                        return (
                            <div style={{'paddingLeft':'20px'}}>
                            <h3 align={'left'} >Your Helper</h3>
                        <Item data={this.state.contact_list[0]} status={status} />
                            </div>
                        );
                    }else{
                        return <div/>
                    }
            }
            case "1.3":{
                if(this.state.contact_list){
                    return (
                        <div style={{'paddingLeft':'20px'}}>
                            <h3 align={'left'} >Your Helper</h3>
                        <Item data={this.state.contact_list[0]} status={status}/>
                        </div>
                    );
                }else{
                    return <div/>
                }
            }
        }
    }


    render() {
        const data = this.state.data;
        return (data==null || this.state.loading) ?
            (<div>Loading</div>) :
            (<div>
                <div align={'left'} style={{'paddingLeft':'20px'}}>
                    <h3 >My Post Summary</h3>
                    <ul>
                        <li>Job Name: {data.title}</li>
                        <li>Status: {parseCode(data.status)}</li>
                        <li>Posted On: {convertTime(data.postDate)}</li>
                        <li>Expire Date: {convertTime(data.startDate)}</li>
                    </ul>
                </div>
                <Divider/>
                {this.statusRelatedContent(data.status)}
                <div>

                    <Divider/>
                </div>
                <Divider/>
                <TaskDetails_detail id={this.props.match.params.id}/>

                {data.status==="1.1"?<div style={{'paddingLeft':'20px','text-align':'center'}}>
                    <JobSummaryPostDelete data={data} title={"Delete"}/>
                </div>
                :
                <div/>}

            </div>);
    }

}

const authCondition = authUser => !!authUser;

export default withAuthorization(authCondition)( JobSummaryPost);
