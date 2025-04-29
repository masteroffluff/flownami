import { UUID } from "node:crypto";
type Task = {
  name: string;
  id: UUID;
    column:string;
};
type Column = {
    name: string;
    tasks: Array<Task>;
  };

async function deflibulateData(){
    const data = await Deno.readTextFile("./data.json");
    const columns = JSON.parse(data);
    const newData:{[key: UUID]:Task} = {};
    columns.forEach((col: Column) => {
        const{name, tasks} = col;
        tasks.forEach(task => {
            newData[task.id] = {...task, column:name}
        });
      });


    await Deno.writeTextFile("./new_data.json", JSON.stringify(newData));
}


deflibulateData();
