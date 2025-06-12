"use client";

import { LogOut } from "lucide-react";
import { Button } from "../ui/button";
import { useRouter } from "next/navigation";

export default function LogoutButton() {
	const router = useRouter();
	const handleLogout = async () => {
		try {
			const res = await fetch("api/auth/logout", {
				method: "POST",
				credentials: "include",
			});
			if (!res.ok) {
				throw new Error("Logout failed");
			}
			router.push("/login");
			router.refresh();
		} catch (err) {
			console.error(err);
		}
	};
	return (
		<Button className="w-full" onClick={handleLogout}>
			<LogOut className="w-4 h-4 mr-2" />
			Logout
		</Button>
	);
}
