import React from "react";
import ADashboard from '../aDashboard/aDashboard'
import EDashboard from '../eDashboard/Edashboard'
import { useState } from "react";
import { useEffect } from "react";
import { getUserDoc } from "../../utils/firebase";
import { useCookies } from "react-cookie";
const Dashboard = ()=> {
	const [role, setRole] = useState()
	const [cookies, setCookie] = useCookies(["nbk"]);
	const userRole = sessionStorage.getItem("userData")
	// useEffect(async () => {
	// 	const user = await getUserDoc();
	// 	if(user) setRole(user.role)
	// }, []);
	return (
		<div>
			{(userRole == 'employee') &&<EDashboard/>}
			{ (userRole == 'admin') && <ADashboard/>}
		</div>
	)
}
export default Dashboard;