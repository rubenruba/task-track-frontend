import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { IconButton } from "@mui/material";
import { nanoid } from "nanoid";
import { FC, useEffect, useRef, useState } from "react";
import { MenuComponent } from "../../components/menu/menu";
import { ListComponent } from "../../components/singleList/singleList";
import { ListModel } from "../../models/list";
import { UserMinimal } from "../../models/user";
import { ListService } from "../../services/ListService";
import "./lists.sass";

export const Lists: FC<{ user: UserMinimal }> = ({ user }) => {
  const listService = new ListService();
  const [lists, setLists] = useState<ListModel[]>([]);
  const [visibleInput, setVisibleInput] = useState(false);
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    const getLists = async () => {
      setLists((await listService.getListsByUserId(user.id)) ?? []);
    };
    getLists();
  }, [user]);

  const createList = async (listName: string) => {
    setVisibleInput(false);
    if (listName.trim().length <= 0) return;
    const newList = {
      id: nanoid(),
      title: listName.trim(),
      tasks: [],
      users: [user.id],
    }
    await listService.createList(newList);
    const newLists = [...lists, newList]
    setLists(newLists);
  }

  const updateList = async (list: ListModel) => {
    const newLists = lists.map(l => {
      if (l.id === list.id) return list;
      return l;
    })
    console.log('asd')
    setLists(newLists);
    await listService.updateList(list);
  }

  const deleteList = async (list: ListModel) => {
    setLists((prev) => prev.filter(l => l.id !== list.id));
    await listService.deleteList(list);
  }

  return (
    <section className="lists-section">
      <MenuComponent />
      <div className="lists-container">
        <h1>Task Lists</h1>
        {!visibleInput && (
          <IconButton onClick={() => setVisibleInput(true)} size="small">
            <AddCircleOutlineIcon style={{ color: "#014B7A" }} />
          </IconButton>
        )}
        {visibleInput && (
          <input
            type="text"
            ref={inputRef}
            autoFocus
            onBlur={(e) => createList(e.target.value)}
            onKeyDown={(e) =>
              e.key === "Enter" &&
              createList((e.target as HTMLInputElement).value)
            }
            className="add-input"
          />
        )}
        <div className="all-lists">
          {lists.map((list) => {
            return <ListComponent
              key={list.id}
              list={list}
              handleDelete={deleteList}
              handleUpdate={updateList}
            />
          })}
        </div>
      </div>
    </section>
  );
};
