import React from "react";
import UsersListItem from "./UsersListItem";

//create a component for show users in a list
export default class UsersList extends React.Component {

    //map an item of list to a UsersListItem and pass methods and params
    renderItems () {
        return this.props.users.map((c, index) => {
            return (
                <UsersListItem
                    key={c.id}
                    {...c}
                    markUser={this.props.markUser}
                />
            )
        });
    }
    render () {
        if (!this.props.users.length) {
            return <p className="tutorial">Add this User!? :)</p>;
        }
        return (
            <table className="listOfUsers">
                <tbody>
                <tr>
                    <th>id</th>
                    <th>name</th>
                </tr>
                    {this.renderItems()}
                </tbody>
            </table>
        )
    }
}
