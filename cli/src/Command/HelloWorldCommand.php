<?php

namespace PhpExamples\Cli\Command;

use Symfony\Component\Console\Attribute\AsCommand;
use Symfony\Component\Console\Command\Command;
use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Output\OutputInterface;

#[AsCommand(name: 'root:hello-world', description: 'You know what.')]
class HelloWorldCommand extends Command
{
    protected function execute(InputInterface $input, OutputInterface $output): int
    {
        $output->writeln('Hello World');
        return Command::SUCCESS;
    }

    protected function configure(): void
    {
        $this
            ->setHelp('This command prints "Hello World" to the console.')
        ;
    }
}