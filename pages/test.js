import classNames from "classnames";
import Card from "components/card/Card";
import Input from "components/Form/Inpux";
import Dashboard from "components/layout/Dashboard";
import Table, { Cell } from "components/Table";
import { Edit2, Eye, Trash2 } from "react-feather";

const Page = () => {
  const data = [
    {
      id: 1,
      project: "React Project",
      client: "Eshal Rosas",
      status: "Active",
    },
    {
      id: 2,
      project: "Vue Project",
      client: "Anita Rodriquez",
      status: "Completed",
    },
  ];

  return (
    <Dashboard>
      <Card>
        <Input label="test" />
      </Card>
      <br></br>
      <Table data={data}>
        <Cell label="Project" name="project" />
        <Cell label="Client" name="client" />
        <Cell
          label="Status"
          name="status"
          center
          render={(data) => (
            <span
              className={classNames("py-1", "px-3", "rounded-full", "text-xs", {
                "bg-purple-200": data == "Active",
                "bg-green-200": data == "Completed",
              })}
            >
              {data}
            </span>
          )}
        />
        <Cell
          label="action"
          name="id"
          center
          render={(data) => (
            <>
              <Eye className="w-4 mr-2 transform hover:text-purple-500 hover:scale-110" />
              <Edit2 className="w-4 mr-2 transform hover:text-purple-500 hover:scale-110" />
              <Trash2 className="w-4 mr-2 transform hover:text-purple-500 hover:scale-110" />
            </>
          )}
        />
      </Table>
    </Dashboard>
  );
};

export default Page;
