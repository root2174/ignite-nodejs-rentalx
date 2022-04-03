import { v4 as uuidV4 } from 'uuid';

class Specification {
  id: string;
  name: string;
  description: string;
  created_at: Date;

  constructor(name: string, description: string, created_at: Date) {
    this.id = uuidV4();
    this.name = name;
    this.description = description;
    this.created_at = created_at;
  }

  static Builder = class {
    private name: string = '';
    private description: string = '';
    private created_at: Date = new Date();

    setName(name: string) {
      this.name = name;
      return this;
    }

    setDescription(description: string) {
      this.description = description;
      return this;
    }

    setCreatedAt(created_at: Date) {
      this.created_at = created_at;
      return this;
    }

    build() {
      return new Specification(this.name, this.description, this.created_at);
    }
  };
}

export { Specification };
