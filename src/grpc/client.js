import { UserServiceClient } from './UserServiceClientPb.ts'
import proto from './user_pb.js'

export default (email, id, phone, fullname) => {
  const client = new UserServiceClient('http://localhost:8080', null, null)
  let request = new proto.User()

  request = request.setEmail(email)
  request = request.setId(id)
  request = request.setPhone(phone)
  request = request.setFullname(fullname)

  client.addUser(request, {}, (err, response) => {
    console.log(err.message)
    console.log(response)
  })
}
