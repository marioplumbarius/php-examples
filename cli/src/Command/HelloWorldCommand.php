<?php

namespace PhpExamples\Cli\Command;

use PhpExamples\Cli\Input\InputValidator;
use PhpExamples\Cli\Service\Greeter;
use Symfony\Component\Console\Attribute\AsCommand;
use Symfony\Component\Console\Command\Command;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Output\OutputInterface;
use Symfony\Component\Console\Input\InputOption;

#[AsCommand(name: 'root:hello-world', description: 'You know what.')]
class HelloWorldCommand extends Command
{
    public function __construct(private readonly Greeter $greeter, private readonly InputValidator $inputValidator)
    {
        parent::__construct();
    }

    protected function execute(InputInterface $input, OutputInterface $output): int
    {
        $this->inputValidator->validateRequiredOptions($input, ['name']);
        $message = $this->greeter->greet($input->getOption('name'));
        $output->writeln($message);

        return Command::SUCCESS;
    }

    protected function configure(): void
    {
        $this
            ->setHelp('This command prints "Hello World" to the console.')
            ->addOption('name', null, InputOption::VALUE_REQUIRED, 'The name of the person to greet.');
        ;
    }
}