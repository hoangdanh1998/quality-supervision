interface CreateScenarioDTO { 
	name: string;
	steps: string;
	preparation?: Preparation

}

interface Preparation {
	socket?: any;
	variables?:any;

}