export class User {
  id!: number;

  title!: string | null;

  firstName!: string;

  lastName!: string;

  email!: string;

  password!: string;

  matriculationNumber!: string | null;

  isAdmin!: boolean;

  createdAt!: Date;
}
