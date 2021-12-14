import React from "react";

const Table = (props) => {
  const {
    head,
    body = [],
    setting = [],
    updateData,
    deleteData,
    createData,
    addData,
    height,
  } = props;

  const getField = (value, setting, idxr, idxc) =>
    setting?.disabled ? (
      <span
        style={setting?.width ? { width: setting.width } : {}}
        className="input is-small has-text-weight-normal h-auto"
      >
        {value}
      </span>
    ) : (
      <input
        key={`key-${idxr}-${idxc}`}
        style={setting?.width ? { width: setting.width } : {}}
        readOnly={setting?.disabled}
        className="input is-small"
        onKeyDown={(e) => {
          console.log(e);
          if (
            !(
              (e.keyCode > 95 && e.keyCode < 106) ||
              (e.keyCode > 47 && e.keyCode < 58) ||
              e.keyCode == 8
            ) && setting?.type
          ) {
            e.preventDefault();
            return false;
          }
        }}
        type={setting?.type ?? "text"}
        onChange={(event) =>{ 
          if (event.target.value === '') {
            updateData(body, idxr, idxc, body[idxr][idxc])
          } else {
            updateData(body, idxr, idxc, event.target.value)
          }

        }}
        value={value}
      />
    );

  return (
    <table
      style={{ margin: 5 }}
      className="table is-striped is-hoverable is-fullwidth"
    >
      {head}
      <tbody style={{ maxHeight: `${height}vh`, overflow: "scroll" }}>
        {body.map((row, idxr) => (
          <tr key={`key-${idxr}`}>
            {row.map((col, idxc) => {
              if (!col) return;
              return (
                <th
                  key={`key-${idxr}-${idxc}`}
                  rowSpan={setting[idxc]?.rowSpan ?? 1}
                >
                  {getField(col, setting[idxc], idxr, idxc)}
                </th>
              );
            })}
            {deleteData && (
              <th>
                <button
                  onClick={() => deleteData(idxr)}
                  className="button is-small is-danger is-light"
                >
                  Х
                </button>
              </th>
            )}
          </tr>
        ))}
        {createData && (
          <tr>
            {addData?.map((col, idx) => (
              <th key={`idx-${idx}`}>
                <input
                  key={`idx-${idx}`}
                  style={
                    setting?.[idx]?.width ? { width: setting[idx].width } : {}
                  }
                  disabled={setting?.[idx]?.disabled}
                  className="input is-small"
                  type={setting?.[idx]?.type ?? "text"}
                  value={col}
                  onChange={(event) =>
                    updateData(addData, -1, idx, event.target.value)
                  }
                />
              </th>
            ))}
            <th>
              <button
                onClick={createData}
                className="button is-primary is-light is-small"
              >
                +
              </button>
            </th>
          </tr>
        )}
      </tbody>
    </table>
  );
};

export default Table;
