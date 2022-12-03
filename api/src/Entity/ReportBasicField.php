<?php

declare(strict_types=1);

namespace App\Entity;

use ApiPlatform\Metadata\ApiResource;
use ApiPlatform\Metadata\Get;
use ApiPlatform\Metadata\GetCollection;
use ApiPlatform\Metadata\Post;
use ApiPlatform\Metadata\Put;
use App\State\ReportBasicFieldStateProcessor;
use Doctrine\ORM\Mapping\Column;
use Doctrine\ORM\Mapping\Entity;
use Symfony\Component\Serializer\Annotation\Groups;

#[ApiResource(
    operations: [
        new GetCollection(openapi: false),
        new Get(openapi: false),
    ],
)]
#[Post()]
#[Put()]
#[Entity]
class ReportBasicField extends ReportField
{
    #[Column(type: 'string', length: 64000)]
    #[Groups(['report:item:read', 'report:item:write', 'baseReport:item:read', 'baseReport:item:write'])]
    private string $textValue;

    public function getTextValue(): string
    {
        return $this->textValue;
    }

    public function setTextValue(string $textValue): void
    {
        $this->textValue = $textValue;
    }
}
