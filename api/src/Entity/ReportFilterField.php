<?php

declare(strict_types=1);

namespace App\Entity;

use ApiPlatform\Metadata\ApiResource;
use ApiPlatform\Metadata\Get;
use ApiPlatform\Metadata\GetCollection;
use ApiPlatform\Metadata\Post;
use ApiPlatform\Metadata\Put;
use App\State\ReportFilterFieldStateProcessor;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping\Column;
use Doctrine\ORM\Mapping\Entity;
use Symfony\Component\Serializer\Annotation\Groups;

#[ApiResource(
    operations: [
        new GetCollection(openapi: false),
    ],
)]
#[GetCollection()]
#[Get()]
#[Post(processor: ReportFilterFieldStateProcessor::class)]
#[Put(processor: ReportFilterFieldStateProcessor::class)]
#[Entity]
class ReportFilterField extends ReportField
{
    #[Column(type: 'json', nullable: true)]
    #[Groups(['baseReport:item:read', 'baseReport:item:write'])]
    private ?string $filter = null;

    private Collection $records;

    public function getFilter(): ?string
    {
        return $this->filter;
    }

    public function setFilter(?string $filter): void
    {
        $this->filter = $filter;
    }
}
