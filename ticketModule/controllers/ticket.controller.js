import prisma from '../../DB/db.config.js';
import ErrorHandler from '../../utils/errorHandler.js';

const create = async (req, res) => {
    try {
        const { title, description, type, venue, status, priority, duedate } = req.body;
        const newTicket = await prisma.ticket.create({
            data: {
                title,
                description,
                type,
                venue,
                status,
                priority,
                duedate,
            }
        })
        res.json({
            newTicket,
            status: 201
        })
    } catch (error) {
        console.log(error)
        ErrorHandler(error, req, res);
    }

}

const assign = async(req, res) => {
    console.log("in assigmnet")
    try {
        const{ ticketId } = req.params;
        const { userId } = req.body;
        console.log(ticketId, userId)

        const ticket = await prisma.ticket.findUnique({
            where: {
                id: Number(ticketId)
            }
        })

        //check if user exist
        if(!ticket) {
            return res.json({
                sttaus: 404,
                message: 'Ticket not found'
            })
        }

        //check if ticket exist
        const user = await prisma.user.findUnique({
            where: {
                id: Number(userId)
            }
        })

        //check if user exist
        if(!user) {
            return res.json({
                sttaus: 404,
                message: 'User not found'
            })
        }


        // check if the ticket is already assigned to a user
        const existingAssignment = await prisma.ticketAssignment.findFirst({
            where: {
                ticketId: Number(ticketId),
                userId: Number(userId),
            }
        })

        if (existingAssignment) {
            return res.json({
                status: 400,
                message: 'ticket already assigned to this user'
            })
        }

        // check limit
        const assignmentcount = await prisma.ticketAssignment.count({
            where:{
                ticketId: Number(ticketId)
            }
        })

        // We can make it dynamic by sending this in req body
        if(assignmentcount >= 5) {
            return res.json({
                status: 400,
                message: 'Ticket can be assigned maximum of 5 users'
            })
        }

        // Assign ticket to the user
        await prisma.ticketAssignment.create({
            data:{
                ticketId: Number(ticketId),
                userId: Number(userId)
            }
        })

        res.json({
            status: 201,
            message: 'Ticket Assigned successfully'
        })
    

    } catch (error) {
        
    }
}

const detail = async (req, res) => {
    try {
        const { ticketId } = req.params;
        const ticket = await prisma.ticket.findUnique({
            where: {
                id: Number(ticketId)
            }
        })

        if(!ticket) {
            res.json({
                status: 404,
                message: "Ticket Not found"
            })
        }

        const assignedUser = await prisma.ticketAssignment.findMany({
            where:{
                ticketId: Number(ticketId)
            },
            include: {
                user: {
                    select:{
                        name: true
                    }
                }
            }
        })

        res.json({
            status: 200,
            data: {
                ticket,
                assignedUser
            }
        })
    } catch (error) {
        
    }
}

export default { create, assign, detail };