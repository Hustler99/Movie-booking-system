import dataSource from "../../datasource/dataSource";
import { User } from "./User.entity";
import { hashPassword } from "./auth.util";

const userRepo = dataSource.getRepository(User);
export const isUserExist = async (email: string) => {
  let result = userRepo.findOneBy({ email });
  return result;
};

export const createUser = async (
  email: string,
  firstName: string,
  lastName: string,
  password:string,
) => {
  let user = new User();
  password = await hashPassword(password);

  user.email=email;
  user.firstName=firstName;
  user.lastName=lastName;
  user.Password=password;

  const result = userRepo.save(user);
  return result;
  
};

