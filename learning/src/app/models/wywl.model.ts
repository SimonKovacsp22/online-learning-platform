export interface IWYWL {
  id?: number | null;
  sentence: string;
  placeholder?: string;
}

export class WYWL implements IWYWL {
  constructor(sentence: string, id?: number | null, placeholder?: string) {
    this.id = id;
    this.sentence = sentence;
    this.placeholder = placeholder;
  }
  id?: number | undefined | null;
  placeholder?: string | undefined;
  sentence: string;
}
