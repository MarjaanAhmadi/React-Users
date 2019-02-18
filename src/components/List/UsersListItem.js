import React from "react";

export default class UsersListItem extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
           isEditing: false,
           user: []
        };
        this.markUser = this.markUser.bind(this)
    }
    componentWillMount(){
      this.setState({
        user: this.props
      });
    }

    render () {
        const { isTrusted } = this.props;
        return (
            <tr onClick={this.markUser}
                className={"user-" + (isTrusted ? "trusted" : "not-trusted") }>
                <td
                   className="itemBorder">
                   {this.state.user.id}
                 </td>
                 <td>
                     {this.state.user.name}
                 </td>
            </tr>
        )
    }

    //mark user as trusted
    markUser = () => {
      console.log(this.props.id);
        this.props.markUser(this.props.id);
    }

}
