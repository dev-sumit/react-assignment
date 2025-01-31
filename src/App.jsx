import {
	Routes,
	Route,
	Navigate,
	useNavigate,
	useLocation,
} from "react-router-dom";

import { history } from "_helpers";
import { Nav, PrivateRoute } from "_components";
import { Home } from "home";
import { Login } from "login";
import AddCard from "cards/AddCard";
import Cards from "cards/Cards";


export { App };

function App() {
	// init custom history object to allow navigation from
	// anywhere in the react app (inside or outside components)
	history.navigate = useNavigate();
	history.location = useLocation();

	return (
		<div className="app-container">
			<Nav />
			<div className="container pt-4 pb-4">
				<Routes>
					<Route
						path="/"
						element={
							<PrivateRoute>
								<Home />
							</PrivateRoute>
						}
					/>
					<Route path="/login" element={<Login />} />
					<Route
						path="/cards/new"
						element={
							<PrivateRoute>
								<AddCard />
							</PrivateRoute>
						}
					/>
					<Route
						path="/cards"
						element={
							<PrivateRoute>
								<Cards />
							</PrivateRoute>
						}
					/>
					<Route path="*" element={<Navigate to="/" />} />
				</Routes>
			</div>
		</div>
	);
}
