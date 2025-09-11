import { useState } from 'react';
import Layout from '../components/Layout';
import '../styles/homePage.css';
import '../styles/pseudo.css';

const Pseudo = () => {
  const [showFilters, setShowFilters] = useState(false);

  const toggleFilterSection = () => {
    setShowFilters(prev => !prev);
  };


  return (
    <Layout
        title={"Pseudo Elements"}
        description={"A showcase of the visibility and behavior of pseudo-elements."}
    >
        <div className="pseudo-container">
        <div className="example">
            <h1>T1: pseudo :after is visible and will be used</h1>
            <p>
            All rules ok: element visible; content empty; position absolute; left and
            right = 0 (show the 3 border-bottom in order :after - :before - element,
            if inspect and disable each one property, this order will be respected).
            </p>
            <p>
            We can validate the pseudo - :after overlaps :before and the element
            properties
            </p>
            <div className="classTest-1">
            <input type="text" placeholder="teste" />
            </div>
        </div>

        <div className="example">
            <h1>T2: pseudo :before is visible and will be used</h1>
            <p>
            All rules ok: element visible; content empty; position absolute; left and
            right = 0 (show the 3 border-bottom in order :after - :before - element,
            if inspect and disable each one property, this order will be respected).
            </p>
            <p>
            We can validate the pseudo - :after doesn't exist, so :before is visible
            because it overlaps the element properties
            </p>
            <div className="classTest0">
            <input type="text" placeholder="teste" />
            </div>
        </div>

        <div className="example">
            <h1>T3: element's property is visible and will be used</h1>
            <p>
            (left and right properties missing): element visible; content empty;
            position absolute; (show only the element border-bottom)
            </p>
            <p>Use just the element to validate.</p>
            <div className="classTest1">
            <input type="text" placeholder="teste" />
            </div>
        </div>

        <div className="example">
            <h1>T4: element's property is visible and will be used</h1>
            <p>
            (position absolute is missing): element visible; content empty; left and
            right = 0; (show only the element border-bottom)
            </p>
            <p>Use just the element to validate.</p>
            <div className="classTest2">
            <input type="text" placeholder="teste" />
            </div>
        </div>

        <div className="example">
            <h1>T5: element's property is visible and will be used</h1>
            <p>
            (content not empty): element visible; content not empty; left and right = 0
            (each one is a distinct "object" on screen, so we can't validate together)
            </p>
            <p>Use just the element to validate.</p>
            <div className="classTest3">
            <input type="text" placeholder="teste" />
            </div>
        </div>

        <div className="example">
            <h1>T6: pseudo element content as icon and text</h1>
            <div>
            <h2>
                <span
                title="Filters"
                className="filter-icon"
                onClick={toggleFilterSection}
                ></span>
                Company List
            </h2>
            </div>
            {showFilters && (
            <div id="filters">
                <div>
                <span className="label label-mandatory">ID</span>
                <input type="text" placeholder="ID" id="companyId" className="m-l-10" />
                </div>
                <div className="m-t-10">
                <span className="label label-mandatory">Name</span>
                <input
                    type="text"
                    placeholder="Name"
                    id="companyName"
                    className="m-l-10"
                />
                </div>
                <div className="m-t-10">
                <button className="save-btn" type="button">
                    Save
                </button>
                </div>
            </div>
            )}

            <table id="companyListTable" className="m-t-10">
            <thead>
                <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Country</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                <td>1</td>
                <td>Island Trading</td>
                <td>Germany</td>
                </tr>
                <tr>
                <td>2</td>
                <td>Ernst Handel</td>
                <td>Austria</td>
                </tr>
            </tbody>
            </table>
        </div>
        </div>
    </Layout>
  );
};

export default Pseudo;