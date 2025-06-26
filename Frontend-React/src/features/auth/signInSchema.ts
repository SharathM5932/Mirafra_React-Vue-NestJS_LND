import { z } from 'zod'
// Using Zod for typesafe validation schema
// emailid : email validation
// pwd : >8char and one capital letter
// We'll use refine method to check the confim pwd

export const signInSchema = z.object(
    {
        emailid: z
        .string()
        .email("Enter the valid email"),

        pwd:z
        .string()
        .min(8, "Password must be atleast 8 characters")
        .regex(/[A-Z]/,"Password should include atleast one UpperCase letter")
        .regex(/[a-z]/,"Password should include atleast one LowerCase letter")
        .regex(/\d/,"Password should include atleast one Number")
        .regex(/[~!@#$%^&*_+:<>?]/,"Password should have atleast one Special character"),

    }
)

export type SignInSchemaType = z.infer<typeof signInSchema>