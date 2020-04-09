import React, {Component} from 'react';
import ContactList from "../Components/ContactList";
import Divider from "@material-ui/core/Divider";
import TaskDetails_detail from "../TaskDetails_detail";
import {auth, database} from "../firebase";
import {parseCode} from "../status";
import Item from "../Components/ContactList/Item";

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
                return (<ContactList data={this.state.contact_list}/>);
            }
            case "1.2":{
                    if(this.state.contact_list){
                        console.log(this.state.contact_list)
                        return (
                        <Item data={this.state.contact_list[0]} hide={false}/>
                        );
                    }else{
                        return <div/>
                    }
            }
            case "1.3":{
                if(this.state.contact_list){
                    return (
                        <Item data={this.state.contact_list[0]} hide={true}/>
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
                <div align={'left'}>
                    <h3 style={{'paddingLeft':'20px'}}>My Post Summary</h3>
                    <ul>
                        <li>Job Name: {data.title}</li>
                        <li>Status: {parseCode(data.status)}</li>
                        <li>Posted On: {data.postDate}</li>
                        <li>Expire Date: {data.startDate}</li>
                    </ul>
                </div>
                <Divider/>
                {this.statusRelatedContent(data.status)}
                <div>

                    <Divider/>
                </div>
                <Divider/>
                <TaskDetails_detail id={this.props.match.params.id}/>
                <Divider/>
            </div>);
    }

}

export default JobSummaryPost;
