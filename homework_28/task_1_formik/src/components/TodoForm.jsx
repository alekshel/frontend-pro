import { Formik, Form, Field, ErrorMessage } from 'formik';
import { schema } from '../helpers/validationSchema';

const TodoForm = ({ onSubmit }) => (
    <Formik
        initialValues={{ task: '' }}
        validationSchema={schema}
        onSubmit={onSubmit}
        validateOnChange={true}
    >
        <Form className="mb-4">
            <div>
                <Field
                    type="text"
                    name="task"
                    placeholder="New task"
                    className="border p-2 mr-2"
                />
                <ErrorMessage name="task" component="div" className="text-red-500 mt-2" />
            </div>

            <button type="submit" className="bg-blue-500 text-white p-2 rounded">
                Add
            </button>
        </Form>
    </Formik>
);

export default TodoForm;
