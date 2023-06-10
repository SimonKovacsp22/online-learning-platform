export interface IWYWL {
  id?: number | null;
  sentence: string;
}

export class WYWL implements IWYWL {
  constructor(sentence: string, id?: number | null) {
    this.id = id;
    this.sentence = sentence;
  }
  id?: number | undefined | null;
  sentence: string;
}
