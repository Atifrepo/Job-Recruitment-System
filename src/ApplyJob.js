import React, {Component} from 'react';
import TextField from 'material-ui/TextField';
import './signup.css';
import ApplyJobSuccess from "./ApplyJobSuccess.js";
import {auth, database} from "./firebase";
import withAuthorization from "./withAuthorization";


class ApplyJob extends Component {
    constructor() {
        super();
        this.state = {
            visible: false,
            myInfo: {
                name: null,
                phone: null,
                e_mail: null,
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
            this.setState({
                myInfo: {
                    name: auth.currentUser.displayName,
                    phone: auth.currentUser.phoneNumber,
                    e_mail: auth.currentUser.email,
                    desc: null,
                    applyDate: new Date(new Date().getTime())
                }
            })
        });
    }


    inputChange(changeValue, event) {
        let info = this.state.myInfo;
        info[changeValue] = event.target.value;
        this.setState({
            myInfo: info
        });

    }

    render() {
        return (

            <div>
                <form style={{'text-align': 'center'}}>
                    <TextField
                        name="Name"
                        hintText="Name"
                        floatingLabelText="Full Name"
                        value={this.state.myInfo.name}
                        onChange={this.inputChange.bind(this, "name")}
                        floatingLabelFixed
                    />
                    <br/>

                    <TextField
                        name="Phone"
                        hintText="Phone"
                        floatingLabelText="Phone"
                        value={this.state.myInfo.phone}
                        onChange={this.inputChange.bind(this, "phone")}
                        floatingLabelFixed
                    />
                    <br/>

                    <TextField
                        name="Email"
                        hintText="Email"
                        floatingLabelText="Email"
                        value={this.state.myInfo.e_mail}
                        onChange={this.inputChange.bind(this, "e_mail")}
                        floatingLabelFixed
                    />
                    <br/>
                    <label className="mdc-text-field mdc-text-field--textarea">
                        <label className="mdc-floating-label" id="my-label-id">Please Describe Yourself</label>
                        <br/>
                        <textarea aria-labelledby="my-label-id" onChange={this.inputChange.bind(this, "desc")} rows="10" cols="50"/>
                        <div className="mdc-notched-outline">
                            <div className="mdc-notched-outline__leading"/>
                            <div className="mdc-notched-outline__notch">
                            </div>
                            <div className="mdc-notched-outline__trailing"/>
                        </div>
                    </label>
                    <br/><br/>
                    <ApplyJobSuccess data={this.state.myInfo} id={this.props.match.params.id} title="Submit" link="/student"/>
                </form>
            </div>

        )
    };
}

const authCondition = authUser => !!authUser;

export default withAuthorization(authCondition)( ApplyJob)