import { z } from 'zod'
// Using Zod for typesafe validation schema

// emailid : email validation
// name : >=3char
// phno == 10 character
// pwd : >8char and one capital letter
// We'll use refine method to check the confim pwd

export const signUpSchema = z.object(
    {
        emailid: z
        .string()
        .email("Enter the valid email"),

        name : z
        .string()
        .min(3, "Name must be atleast 3 character")
        .max(50, "Name must be under 50 character"),

        phno : z
        .string()
        .regex(/^[6-9]\d{9}$/ , "Enter a valid 10 digit valid Indian Phone no."),

        pwd:z
        .string()
        .min(8, "Password must be atleast 8 characters")
        .regex(/[A-Z]/,"Password should include atleast one UpperCase letter")
        .regex(/[a-z]/,"Password should include atleast one LowerCase letter")
        .regex(/\d/,"Password should include atleast one Number")
        .regex(/[~!@#$%^&*_+:<>?]/,"Password should have atleast one Special character"),

        confirmPassword: z
        .string()
    }
)
.refine((data)=>data.pwd === data.confirmPassword, {
    message : "Passwords do not match!",
    path : ['confirmPassword']
})

export type SignUpSchemaType = z.infer<typeof signUpSchema>