export namespace AuthMessages {
    export function logOut(): string[] {
        return [`Are you sure ?`]
    }
    export function resetPassSucces(email: string): string[] {
        return [`Password reset link has been sent to ${email}.`,`Checkout your email to set new password.`]
    }
    export function resetPassFailure(email: string): string[] {
        return [`${email} wasn't registered on Mode-Concept.`,`Please type email of your account.`]
    }
}
