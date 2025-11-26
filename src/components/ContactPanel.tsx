const ContactPanel = () => {
  return (
    <aside className="p-6 bg-white rounded-2xl shadow">
      <h4 className="font-semibold">Contact</h4>
      <p className="text-xs mt-2">Email: jerson.conmigo@gmail.com</p>
      <p className="text-xs">Alternate: jconmigo@yahoo.com</p>
      <div className="mt-4">
        <h5 className="text-sm font-semibold">Links</h5>
        <ul className="mt-2 text-xs">
          <li>
            <a href="https://www.linkedin.com/in/jerson-conmigo" className="underline">
              LinkedIn
            </a>
          </li>
          <li>
            <a href="https://github.com/jersrej" className="underline">
              GitHub
            </a>
          </li>
        </ul>
      </div>
    </aside>
  );
};

export default ContactPanel;
