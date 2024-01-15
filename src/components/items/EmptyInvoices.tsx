import Image from "next/image";

// import styles from "./EmptyInvoices.module.scss";

export function EmptyInvoices() {
  return (
    <div className=" flex items-center justify-center flex-col space-y-4 pt-32 w-full">
      <Image
        src="/icons/illustration-empty.svg"
        alt=""
        width="193"
        height="160"
      />
      <h2>There is nothing here</h2>
      <p className="text-dark" style={{ padding: "0 1em" }}>
        Create an invoice by clicking the <b>New</b> button and get started
      </p>
    </div>
  );
}
