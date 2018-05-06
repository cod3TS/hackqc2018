import React from "react";

class Login extends React.Component {
    constructor() {
        super();
        this.state = {
            user: "",
            password: ""
        };
        this.onSubmit = this.onSubmit.bind(this);
        this.onChange = this.onChange.bind(this);
    }
    onSubmit(e) {
        e.preventDefault();
        window.localStorage.setItem("user", this.state.user);
        this.props.history.push("/map");
    }
    onChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        });
    }
    render() {
        return (
            <div className="login-page">
                <div className="form">
                    <form className="login-form" onSubmit={this.onSubmit}>
                        <input
                            onChange={this.onChange}
                            type="text"
                            name="user"
                            placeholder="Nom d'utilisateur"
                        />
                        <input
                            onChange={this.onChange}
                            type="password"
                            name="password"
                            placeholder="Mot de passe"
                        />
                        <button className="btn">Se Connecter</button>
                        <p className="message">
                            Pas de compte? <a href="#">Créer un compte</a>
                        </p>
                    </form>
                </div>
            </div>
        );
    }
}

export default Login;
