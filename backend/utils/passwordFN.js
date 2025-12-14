import bcryptjs from 'bcryptjs';

export const hashedPassword = async(password)=>{
    const salt = await bcryptjs.genSalt(10);
    return bcryptjs.hash(password,salt);
}

export const comparePassword = async(password,hashPassword)=>{
    return bcryptjs.compare(password,hashPassword);
}