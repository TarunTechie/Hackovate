const { user, officer, complains } = require('./models')

async function login(data)
{
    try {
        const results = await user.findOne({phone:data.phone,password:data.password})
        return results
    } catch (error) {
        console.error(error)
    }
}

async function register(data,type)
{
    if (type === "user")
    {
        try {
            const results = await user.insertOne({
                name: data.name,
                phone: data.phone,
                email: data.mail,
                password:data.password,
                address: {
                    city: data.city,
                    state: data.state,
                    pincode: data.pincode,
                    street:data.street
                }
            })
            return results
        } catch (error) {
            console.error(error)
        }
    }
    if (type === "officer")
    {
        try {
            const results = await officer.insertOne({
                name: data.name,
                phone: data.phone,
                email: data.email,
                office: data.office,
                address: {
                    city: data.city,
                    state: data.state,
                    pincode: data.pincode,
                    street:data.street
                },
            })
            return results
        } catch (error) {
            console.error(error)
        }
    }
}

async function fileComplain(data)
{   
    try {
        console.log(data)
        const results = await complains.insertOne(data)
    } catch (error) {
        console.error(error)
    }
}

module.exports = {register,login,fileComplain}