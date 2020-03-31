import React, {Component} from 'react';
import TextField from 'material-ui/TextField';
import DatePicker from 'material-ui/DatePicker'
import './signup.css';
import PostJobSuccess from "./PostJobSuccess";
import {auth, database} from './firebase';

class PostJob extends Component {
    constructor() {
        super();
        this.state = {
            visible: false,
            myInfo: {
                title: null,
                phone: auth.currentUser.phoneNumber,
                e_mail: auth.currentUser.email,
                startDate: new Date(new Date().getTime() + 7 * 24 * 60 * 60 * 1000),
                desc: null
            },
            currentUser: {},
            fields: [],
            error: 'this is error'
        }


        this.userRef = database.ref('/users').child('Anonymous');

    }

    componentDidMount() {
        auth.onAuthStateChanged((currentUser) => {
            this.setState({currentUser: auth.currentUser || {}});
        });

    }


    inputChange(changeValue, event) {
        this.state.myInfo[changeValue] = event.target.value;
        console.log('event', event.target.value);
        this.setState({
            myInfo: this.state.myInfo
        });

    }

    handleDateChange(e, date) {
        this.state.myInfo.startDate = date;
        this.setState({
            myInfo: this.state.myInfo
        });
    }


    render() {
        return (
            <div>
                <form style={{'text-align': 'center'}}>
                    <TextField
                        name="Title"
                        hintText="Title"
                        floatingLabelText="Title"
                        defaultValue={this.state.myInfo.title}
                        onChange={this.inputChange.bind(this, "title")}
                        floatingLabelFixed
                    />
                    <br/>

                    <TextField
                        name="Phone"
                        hintText="Phone"
                        floatingLabelText="Phone"
                        defaultValue={this.state.myInfo.phone}
                        onChange={this.inputChange.bind(this, "phone")}
                        floatingLabelFixed
                    />
                    <br/>

                    <TextField
                        name="Email"
                        hintText="Email"
                        floatingLabelText="Email"
                        defaultValue={this.state.myInfo.e_mail}
                        onChange={this.inputChange.bind(this, "e_mail")}
                        floatingLabelFixed
                    />
                    <br/>
                    <DatePicker
                        name="Start Date"
                        hintText="Start Date"
                        floatingLabelText="Start Date"
                        //TODO: default set 7 days?
                        value={this.state.myInfo.startDate}
                        onChange={this.handleDateChange.bind(this)}
                        floatingLabelFixed
                    />
                    <br/>
                    <label className="mdc-text-field mdc-text-field--textarea">
                        <label className="mdc-floating-label" id="my-label-id">Please Describe Your Job and Your
                            Requirement</label>
                        <br/>
                        <textarea aria-labelledby="my-label-id" rows="10" cols="50"
                                  onChange={this.inputChange.bind(this, 'desc')}/>
                        <div className="mdc-notched-outline">
                            <div className="mdc-notched-outline__leading"/>
                            <div className="mdc-notched-outline__notch">
                            </div>
                            <div className="mdc-notched-outline__trailing"/>
                        </div>
                    </label>
                    <br/><br/>
                    <PostJobSuccess data={this.state.myInfo} title="Submit"/>
                    <br/><br/><br/><br/>
                </form>
            </div>

        )
    };
}

export default PostJob