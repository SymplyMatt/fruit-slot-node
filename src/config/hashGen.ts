import bcrypt from 'bcrypt'

export default async function genHash (password: any){
    const salt = await bcrypt.genSalt(10);
    const hashedPwd = await bcrypt.hash(password, salt);
    return hashedPwd;
}