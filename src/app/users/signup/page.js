"use client";
import 'bootstrap/dist/css/bootstrap.css';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';

const Signup = () => {
	const router = useRouter();
	const [redirect, setRedirect] = useState(false);
	const [firstName, setFirstName] = useState('');
	const [lastName, setLastName] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [city, setCity] = useState('');
	const [profilePicture, setProfilePicture] = useState('');
	const [userName, setUserName] = useState('');
	const [bio, setBio] = useState('');
	const [state, setState] = useState('');
	const [country, setCountry] = useState('');
	const [error, setError] = useState(false);

	const handleFirstName = (e) => {
		setFirstName(e.target.value);
	};

	const handleLastName = (e) => {
		setLastName(e.target.value);
	};

	const handleUserName = (e) => {
		setUserName(e.target.value);
	};

	const handleCity = (e) => {
		setCity(e.target.value);
	};

	const handleState = (e) => {
		setState(e.target.value);
	};

	const handleCountry = (e) => {
		setCountry(e.target.value);
	};

	const handleEmail = (e) => {
		setEmail(e.target.value);
	};

	const handlePassword = (e) => {
		setPassword(e.target.value);
	};

	const handleBio = (e) => {
		setBio(e.target.value);
	};

	const handleProfilePicture = (e) => {
		setProfilePicture(e.target.value);
	};

	const handleSubmit = (e) => {
		e.preventDefault(); // at the beginning of a submit function

		const newUser = {
			firstName,
			lastName,
			userName,
			city,
			state,
			country,
			email,
			password,
			bio,
			profilePicture
		};
		axios.post(`${process.env.NEXT_PUBLIC_SERVER_URL}/users/signup`, newUser)
			.then(response => {
				setRedirect(true);
			})
			.catch(error => {
				if (error.response.data.message === 'Email already exists') {
					console.log('===> Error in Signup', error.response.data.message);
					setError(true);
				}
			});

	};

	if (redirect) { router.push('/'); }
	if (error) {
		return (
			<div>
				<div className="card text-white bg-primary py-5 d-md-down-none" style={{ width: "44%" }}>
					<div className="card-body text-center">
						<div>
							<p>Email already exists</p>
							<br />
							<h2>Login</h2>
							<p>Sign In to your account</p>
							<a href="/" type="button" className="btn btn-primary active mt-3">Login</a>
							<span>  </span>
							<a href="/users/signup" type="button" className="btn btn-secondary active mt-3">Signup</a>
						</div>
					</div>
				</div>
			</div>
		);
	}
	// You can have them redirected to profile (your choice)

	return (
		<div className="container">
			<br />
			<br />
			<br />
			<br />
			<div className="row justify-content-center">
				<div className="col-md-8">
					<div className="card-group mb-0">
						<div className="card p-4">
							<div className="card-body">
								<form onSubmit={handleSubmit}>
									<h1>Sign Up</h1>
									<p className="text-muted">Create an account below to get started</p>
									<div className="input-group mb-3">
										<span className="input-group-addon"><i className="fa fa-whatsapp"></i></span>
										<input type="text" className="form-control" placeholder="First Name" value={firstName} onChange={handleFirstName} required/>
									</div>
									<div className="input-group mb-3">
										<span className="input-group-addon"><i className="fa fa-whatsapp"></i></span>
										<input type="text" className="form-control" placeholder="Last Name" value={lastName} onChange={handleLastName} required/>
									</div>
									<div className="input-group mb-3">
										<span className="input-group-addon"><i className="fa fa-address-book"></i></span>
										<input type="text" className="form-control" placeholder="User Name" value={userName} onChange={handleUserName} />
									</div>
									<div className="input-group mb-3">
										<span className="input-group-addon"><i className="fa fa-address-book"></i></span>
										<input type="text" className="form-control" placeholder="city" value={city} onChange={handleCity} />
									</div>
									<div className="input-group mb-3">
										<span className="input-group-addon"><i className="fa fa-address-book"></i></span>
										<input type="text" className="form-control" placeholder="State" value={state} onChange={handleState} />
									</div>
									<div className="input-group mb-3">
										<span className="input-group-addon"><i className="fa fa-address-book"></i></span>
										<input type="text" className="form-control" placeholder="Country" value={country} onChange={handleCountry} />
									</div>
									<div className="input-group mb-3">
										<span className="input-group-addon"><i className="fa fa-mail-forward" aria-hidden="true"></i></span>
										<input type="email" className="form-control" placeholder="Email" value={email} onChange={handleEmail} required/>
									</div>
									<div className="input-group mb-3">
										<span className="input-group-addon"><i className="fa fa-lock"></i></span>
										<input type="password" className="form-control" placeholder="Password" value={password} onChange={handlePassword} required/>
									</div>
									<div className="input-group mb-3">
										<span className="input-group-addon"><i className="fa fa-address-book"></i></span>
										<input type="text" className="form-control" placeholder="Bio" value={bio} onChange={handleBio} />
									</div>
									<div className="input-group mb-3">
										<span className="input-group-addon"><i className="fa fa-address-book"></i></span>
										<input type="text" className="form-control" placeholder="Profile Picture" value={profilePicture} onChange={handleProfilePicture} />
									</div>
									<div className="row">
										<div className="col-6">
											<button type="submit" className="btn btn-primary px-4">Sign Up</button>
										</div>
									</div>
								</form>
							</div>
						</div>
						<div className="card text-white bg-primary py-5 d-md-down-none" style={{ width: "44%" }}>
							<div className="card-body text-center">
								<br />
								<br />
								<br />
								<br />
								<br />
								<br />
								<br />
								<br />
								<div>
									<h2>Login</h2>
									<p>Sign In to your account</p>
									<a href="/" type="button" className="btn btn-primary active mt-3">Login</a>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Signup;