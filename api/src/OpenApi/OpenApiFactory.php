<?php

declare(strict_types=1);

namespace App\OpenApi;

use ApiPlatform\OpenApi\Factory\OpenApiFactoryInterface;
use ApiPlatform\OpenApi\OpenApi;

class OpenApiFactory implements OpenApiFactoryInterface
{
    public function __construct(private readonly OpenApiFactoryInterface $decorated)
    {
    }

    /**
     * @param array<string, string> $context
     *
     * @throws \Exception
     */
    public function __invoke(array $context = []): OpenApi
    {
        return $this->decorated->__invoke($context);
    }
}
