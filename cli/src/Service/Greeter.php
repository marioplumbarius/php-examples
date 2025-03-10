<?php

namespace PhpExamples\Cli\Service;

class Greeter
{
    public function greet(string $name): string
    {
        return "Hello {$name}!";
    }
}
