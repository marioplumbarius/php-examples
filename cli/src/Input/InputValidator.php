<?php

namespace PhpExamples\Cli\Input;

use Symfony\Component\Console\Input\InputInterface;
use Symfony\Component\Console\Exception\InvalidArgumentException;

/**
 * Validtor to enforce mandatory options, since Symfony doesn't support them.
 * See https://github.com/symfony/symfony/issues/14716
 */
class InputValidator
{
    /**
     * Validates that the required options are set.
     * 
     * @param InputInterface $input The input to validate
     * @param array $optionNames The names of the options to validate
     * 
     * @throws InvalidArgumentException if the option is not set
     */
    public function validateRequiredOptions(InputInterface $input, array $optionNames): void
    {   
        foreach ($optionNames as $optionName) {
            $value = $input->getOption($optionName);
            if ($value === null) {
                throw new InvalidArgumentException(
                    sprintf('The --%s option is required', $optionName)
                );
            }
        }
    }
} 