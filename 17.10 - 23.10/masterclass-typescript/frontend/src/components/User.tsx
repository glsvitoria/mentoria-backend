interface IUser {
	name: string
	email: string
}

interface Props {
   user: IUser
}

export function User({ user }: Props) {
	return (
		<div>
			<strong>Nome: </strong> {user.name} <br />
			<strong>Email: </strong> {user.email} <br />
		</div>
	)
}
