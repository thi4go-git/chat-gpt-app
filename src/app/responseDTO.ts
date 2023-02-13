import { ChoiceDTO } from "./choiceDTO";
import { UsageDTO } from "./usageDTO";

export class ResponseDTO {
    id: string = '';
    object: string = '';
    created: number = 0;
    model: string = '';
    choices: ChoiceDTO[] = [];
    usage: UsageDTO | undefined
}