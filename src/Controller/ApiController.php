<?php

namespace App\Controller;

use FOS\RestBundle\Controller\FOSRestController;
use FOS\RestBundle\Controller\Annotations as Rest;
use Symfony\Component\HttpFoundation\Request;
use App\Entity\Todo;
use App\Form\Type\TodoType;

/**
 * Class ApiController
 *
 * @package App\Controller
 */
class ApiController extends FOSRestController
{
    /**
     * @param Request $request
     *
     * @return mixed
     *
     * @Rest\Post("/todo")
     * @Rest\View()
     */
    public function createTodoAction(Request $request)
    {
        $manager = $this->getDoctrine()->getManager();

        $todo = new Todo();

        $form = $this->createForm(TodoType::class, $todo);
        $form->handleRequest($request);

        if ($form->isValid()) {
            $manager->persist($todo);
            $manager->flush();

            return $todo;
        }

        return $form;
    }

    /**
     * @param Request $request
     * @param Todo    $todo
     *
     * @return mixed
     *
     * @Rest\Put("/todo/{id}")
     * @Rest\View()
     */
    public function editTodoAction(Request $request, Todo $todo)
    {
        $manager = $this->getDoctrine()->getManager();

        $form = $this->createForm(TodoType::class, $todo, [
            'method' => Request::METHOD_PUT,
        ]);
        $form->handleRequest($request);

        if ($form->isValid()) {
            $manager->persist($todo);
            $manager->flush();

            return $todo;
        }

        return $form;
    }

    /**
     * @param Request $request
     * @param Todo    $todo
     *
     * @return mixed
     *
     * @Rest\Delete("/todo/{id}")
     * @Rest\View()
     */
    public function deleteTodoAction(Request $request, Todo $todo)
    {
        $manager = $this->getDoctrine()->getManager();

        $manager->remove($todo);
        $manager->flush();

        return true;
    }

    /**
     * @return array
     *
     * @Rest\Get("/todos")
     * @Rest\View()
     */
    public function getTodosAction()
    {
        $manager = $this->getDoctrine()->getManager();
        $repo = $manager->getRepository(Todo::class);

        return $repo->findAll();
    }
}
