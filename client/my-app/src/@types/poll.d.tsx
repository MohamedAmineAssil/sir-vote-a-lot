// poll_question_options type
export interface IPollQuestionOptions {
    id:number,
    answer:string,
    votes:number
}

// export Poll interface 
export interface IPoll {
      "connected_role":"Owner" | "User" | "Respondent",
      "poll_main_question":string,
      "poll_question_options":IPollQuestionOptions[]
}

